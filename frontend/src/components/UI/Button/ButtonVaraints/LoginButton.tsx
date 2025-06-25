import Button, { type ButtonProps } from "@/components/UI/Button/Button";

const LoginButton = (props: ButtonProps) => {
    return (
        <Button
            variant='default'
            color='primary'
            {...props}
        >
            로그인
        </Button>
    )
}

export default LoginButton;