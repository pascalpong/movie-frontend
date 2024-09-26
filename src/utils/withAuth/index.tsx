"use client"

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ComponentType, useState, useEffect, ReactElement } from "react";

const withAuth = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
    const WithAuthComponent: React.FC<P> = (props: P): ReactElement => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const router = useRouter();

        useEffect(() => {
            const tokens = {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken')
            };
            const authenticated = !!tokens.accessToken && !!tokens.refreshToken;
            setIsAuthenticated(authenticated);

            if (!authenticated) {
                router.push('/');
            }
        }, [router]);

        if (isAuthenticated === null) {
            return <CircularProgress />;
        }

        if (!isAuthenticated) {
            return <></>;
        }

        return <Component {...props} />;
    }

    WithAuthComponent.displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`;
    return WithAuthComponent;
}

export default withAuth;