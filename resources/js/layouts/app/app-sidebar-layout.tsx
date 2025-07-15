import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem as BreadcrumbItemType, type HeaderButton as HeaderButtonType } from '@/types';

interface AppSidebarLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
    headerButton?: HeaderButtonType;
}


export default function AppSidebarLayout({ children, breadcrumbs = [], headerButton }: AppSidebarLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} headerButton={headerButton} />
                {children}
            </AppContent>
        </AppShell>
    );
}
