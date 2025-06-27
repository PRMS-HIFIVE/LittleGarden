import Button, { type ButtonProps } from "@/components/UI/Button/Button";

const SignUpButton = (props: ButtonProps) => {
    return (
        <Button
            variant='default'
            buttonSize="medium"
            color='tertiary'
            radius='round'
            font-size='medium'
            {...props}
        >
            회원가입
        </Button>
    )
}

export default SignUpButton;