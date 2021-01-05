import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { storage } from '../../firebase'
import useImageUpload from '../../hooks/useImageUpload'


const ImageUpload = ({ albumId }) => {
	const [files, setFiles] = useState([])
	const [message, setMessage] = useState(null)
	const { error, isSuccess } = useImageUpload(files, albumId)


	const handleFileChange = e => {
		let filesToAdd = e.target.files
		// convert object to array
		filesToAdd = Array.from(filesToAdd).map(file => file)
		setFiles(filesToAdd);
	}
	console.log(isSuccess, error)
	return (
		<form>
			<label>Select Files</label>
			<input type="file" multiple onChange={handleFileChange} />
		</form>
	)
}

export default ImageUpload
