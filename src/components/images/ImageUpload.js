import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useImageUpload from '../../hooks/useImageUpload'

const ImageUpload = () => {
	const [images, setImages] = useState(null)
	useImageUpload(images)

	useEffect(() => {

	}) 

	const onDrop = useCallback(acceptedFiles => {
		console.log('acceptedFiles', acceptedFiles)
		if (acceptedFiles.length === 0) {
			return
		}

		setImages(acceptedFiles[0])
	  }, [])

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{
			isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag 'n' drop some files here, or click to select files</p>
			}
		</div>
	)
}

export default ImageUpload
