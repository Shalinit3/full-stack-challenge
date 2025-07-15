import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem as BreadcrumbItemType, type HeaderButton as HeaderButtonType } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
    headerButton?: HeaderButtonType;
}

export default ({ children, breadcrumbs, headerButton, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} headerButton={headerButton} {...props}>
        {children}
    </AppLayoutTemplate>
);
