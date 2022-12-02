import { FaGithub } from 'react-icons/fa/index.js';

const Footer = () => (
    <div className="flex flex-row items-center justify-center">
        <FaGithub />
        <a className="mx-2" href="https://github.com/Developer322">
            My GitHub
        </a>
        {` ${new Date().getFullYear()}.`}
    </div>
);

export default Footer;
