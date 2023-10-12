import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Input,
  VStack,
  Button,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jwtDecode from 'jwt-decode'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './TPOLoginForm.module.scss'
import { studentLoginAPI, studentLogoutAPI } from '../../../utils/apis'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../../utils/functions'

export default function TPOLoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const expireTokens = async () => {
    try {
      await studentLogoutAPI.post('/', {
        refresh_token: getDataFromLocalStorage('refresh_token'),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required')
        .matches(/^[tpo@nith.ac.in]+$/, 'Please enter TPO official id'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await studentLoginAPI.post('/', { ...values })
        const { access, refresh } = res.data

        setDataToLocalStorage('access_token', access)
        setDataToLocalStorage('refresh_token', refresh)

        const accessDecoded: any = jwtDecode(access)
        setDataToLocalStorage('role', accessDecoded.role)

        if (accessDecoded.role === 'TPO') {
          navigate('/dashboard')
        }
      } catch (err: any) {
        toast({
          title: 'Login Failed...',
          description: err.response.data.detail,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    },
  })

  const handleIconClick = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form className={styles.form_container} onSubmit={formik.handleSubmit}>
      <VStack spacing={3}>
        <Input
          name="username"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.username.charAt(0).toUpperCase() + formik.errors.username.slice(1)}
          </Alert>
        ) : null}

        <InputGroup>
          <Input
            name="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputRightElement>
            <Button onClick={handleIconClick}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.password.charAt(0).toUpperCase() + formik.errors.password.slice(1)}
          </Alert>
        ) : null}

        <Button
          background="linear-gradient(40deg,#45cafc,#303f9f)"
          color="white"
          _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
          className={styles.btn}
          width="100%"
          isDisabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          isLoading={formik.isSubmitting}
          loadingText="Logging In...."
        >
          Login
        </Button>
      </VStack>
    </form>
  )
}
