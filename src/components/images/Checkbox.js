import { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { useImage } from '../../contexts/ImageContext'
import './Checkbox.scss'

const Checkbox = ({image}) => {
	const [isChecked, setIsChecked] = useState(false)
	const { handleSelectedImages } = useImage()

	const handleChange = () => {
		setIsChecked(!isChecked)
	}
	return (
		<>
			<label className="checkbox-container" onClick={(e) => handleSelectedImages(e.target.checked, image)}>
				<input
					className={`checkbox-input`}
					name={image.name}
					type="checkbox"
					onChange={handleChange}
					/>
			</label>
			<span className="checkbox-uncheck">
				{
					isChecked
						? (<ImCheckboxChecked className="checkbox-icon"/>)
						: ('')
				}
			</span>
		</>
	)
}

export default Checkbox
