import { Image } from "@chakra-ui/react";

function Logo() {
    return (
        <Image
            className="rounded-full w-12 h-12"
            src="../../assets/logo.jpg"
            alt="Logo"
        />
    );
}

export default Logo;
