import { IconCloseX } from "@/assets/icons/IconList";
import Header from "@/common/Header/Header";


const CameraHeader = () => {
    const handleClose = () => {
        
    }
    return (
        <Header
            backgroundColor='white'
            borderBottom='none'
            padding='72px 25px 20px 25px'
            right={<>
                <IconCloseX onClick={handleClose} />
            </>}

        >
        </Header>
    )
}


export default CameraHeader;