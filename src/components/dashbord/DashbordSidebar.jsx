import { getuserSession } from "@/lib/core/session";
import {
  Bars,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import {
  FiBookmark,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiSearch,
  FiSettings,
} from "react-icons/fi";

export async function DashbordSidebar() {
  const user = await getuserSession();
  const recruiterNaveLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Create A Jobs",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Person, href: "", label: "Profile" },
    { icon: Gear, href: "", label: "Settings" },
  ];
  const seekerNaveLinks = [
    { icon: FiHome, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: FiSearch, href: "/dashboard/seeker/jobs", label: "Jobs" },
    {
      icon: FiBookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FiFileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: FiCreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: FiSettings, href: "/dashboard/seeker/settings", label: "Settings" },
  ];

  const navLinksMap = {
    seeker: seekerNaveLinks,
    recruiter: recruiterNaveLinks,
  };
  const navItems = navLinksMap[user?.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <Bars />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
