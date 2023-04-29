import { ForbiddenResource } from './forbidden-resource';

export const AuthHandler = (props: any) => {
    // const { isLoggedIn } = useContext(AuthContext);
    const isLoggedIn = false;
    return isLoggedIn ? props.children : <ForbiddenResource/>;
};
