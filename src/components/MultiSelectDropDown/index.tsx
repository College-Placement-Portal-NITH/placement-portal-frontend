import { Select, TagLabel, TagCloseButton, Tag, Box } from '@chakra-ui/react'
import { ClusterChosen, MultiSelectDropDownProps } from '../../utils/types'
import styles from './MultiSelectDropDown.module.scss'

export default function MultiSelectDropDown({
  placeholder,
  clusterData,
  choosenClusters,
  onClick,
  onDelete,
}: MultiSelectDropDownProps) {
  return (
    <div>
      <Box maxW={200}>
        <Select
          backgroundColor="white"
          onClick={(e: any) => {
            onClick(e.target.value)
          }}
          placeholder={placeholder}
        >
          {clusterData.map((data) => (
            <option value={data.value} key={data.value}>
              {data.label}
            </option>
          ))}
        </Select>
      </Box>

      <div className={styles.container}>
        {choosenClusters.map((cluster: ClusterChosen, idx: number) => (
          <Tag
            size="sm"
            key={cluster.id}
            borderRadius="full"
            variant="solid"
            justifySelf="center"
            colorScheme="gray"
          >
            <TagLabel>Cluster {cluster.value}</TagLabel>
            <TagCloseButton onClick={() => onDelete(idx)} />
          </Tag>
        ))}
      </div>
    </div>
  )
}
