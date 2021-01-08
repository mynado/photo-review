import { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { useImage } from '../../contexts/ImageContext'
import './Checkbox.scss'

const Checkbox = ({image}) => {
    const [isChecked, setIsChecked] = useState(false)
    const { handleLikeImage } = useImage()

    const handleChange = (e) => {
        setIsChecked(!isChecked)
        
    }
    return (
        <>
            <label className="checkbox-container" onClick={(e) => handleLikeImage(e.target.checked, image)}>
                <input
                    className={`checkbox-input`}
                    name={image.name}
                    type="checkbox"
                    onChange={handleChange}
                    />
            </label>
            <span className="checkbox-checkmark">
                {
                    isChecked
                        ? (<ImCheckboxChecked className="checkbox-icon"/>)
                        : (<ImCheckboxUnchecked className="checkbox-icon" />)
                }
            </span>
        </>
    )
}

export default Checkbox
