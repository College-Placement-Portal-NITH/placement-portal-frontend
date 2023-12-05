import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { nanoid } from 'nanoid'
import './FileUploader.scss'
import './App.scss'

function FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  // Function to handle file selection from the HTML input
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Files: File[] = []
    const fileList = event.target.files
    if (!fileList) return

    for (let i = 0; i < fileList.length; i += 1) {
      Files.push(fileList[i])
    }

    setSelectedFiles((prev) => [...prev, ...Files])

    // eslint-disable-next-line no-param-reassign
    event.target.value = ''
  }

  // Function to handle file drop in the dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const handleSubmit = () => {
    console.log(selectedFiles.length)
  }
  const handleReset = () => {
    setSelectedFiles([])
  }

  return (
    <>
      <div className="app">
        <div className="first-main">
          <div className="firstForm ">
            <label className="label1" htmlFor="input-2">
              Upload files
              <input
                type="file"
                id="input-2"
                name="fileInput"
                className="input1 input-file"
                value={undefined}
                onChange={handleFilesChange}
              />
            </label>

            <div {...getRootProps({ className: 'dropzone dragNdrop' })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Dropping file here .... ....</p>
              ) : (
                <p>Drag N drop some files here, or click to select files</p>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className=""
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 11.25a.75.75 0 001.5 0v-2.546l.943 1.048a.75.75 0 101.114-1.004l-2.25-2.5a.75.75 0 00-1.114 0l-2.25 2.5a.75.75 0 101.114 1.004l.943-1.048v2.546z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="fileList">
              {selectedFiles.map((file) => (
                <div key={nanoid()}>{file.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="stepper-footer">
          <div className="button-wrap">
            <button type="button" className="btn" onClick={handleReset}>
              Reset
            </button>
            <button className="btn" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileUploader
