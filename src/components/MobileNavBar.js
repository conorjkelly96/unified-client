import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";

const pages = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/portfolio" },
  { label: "Resume Page", href: "/resume" },
  { label: "Contact Me", href: "/contact-me" },
];

export const MobileNavBar = ({ open, onClose }) => {
  return (
    <div>
      <Drawer open={open} onClose={onClose} anchor="top">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={onClose}
          onKeyDown={onClose}
        >
          <List>
            {pages.map(({ label, href }) => (
              <ListItem button key={label}>
                <ListItemText>
                  <Link href={href}>{label}</Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
