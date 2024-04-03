const Footer = () => {
    return (
        <footer className="container h-14 max-w-screen-2xl py-4">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by{" "}
                <a
                    href="https://github.com/duhanmeric"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    Meriç Korkmaz
                </a>
                . The source code is available on{" "}
                <a
                    href="https://github.com/duhanmeric/feed-reader"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    GitHub
                </a>
                .
            </p>
        </footer>
    );
};

export default Footer;
