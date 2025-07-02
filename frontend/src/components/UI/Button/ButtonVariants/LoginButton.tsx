import Button, { type ButtonProps } from "@/components/UI/Button/Button";

const LoginButton = (props: ButtonProps) => {
    return (
        <Button
            variant='default'
            buttonSize="medium"
            color='tertiary'
            radius='round'
            font-size='medium'
            {...props}
        >
            로그인
        </Button>
    )
}

export default LoginButton;