import { useState, useRef, useEffect } from 'react'
import { FaBell, FaCog, FaBars } from 'react-icons/fa'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'
import styles from './header.module.css'

const NotificationItem = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    height: 48,
    fontSize: '1rem',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(MenuItem)

const ITEM_HEIGHT = 48

function ToggleButton({ icon, children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a href="#" className={styles.button} onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {open && children}
    </>
  )
}

function Notifications() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <div>
        <Button ref={anchorRef} onClick={handleToggle} style={{ color: 'white' }}>
          <ToggleButton icon={<FaBell />}> </ToggleButton>
        </Button>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 5,
              minHeight: ITEM_HEIGHT * 5,
              width: '300px',
              marginTop: '0.7rem',
            },
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          disablePortal
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <NotificationItem onClick={handleClose}>
                You have been invited to Castle Nathria (Normal)!
              </NotificationItem>
              <NotificationItem onClick={handleClose}>
                You have been set as Substitute for Castle Nathria (Mythic)!
              </NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
              <NotificationItem onClick={handleClose}>Test Notifications</NotificationItem>
            </MenuList>
          </ClickAwayListener>
        </Popover>
      </div>
    </div>
  )
}

function SettingsPopover() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <div>
        <Button ref={anchorRef} onClick={handleToggle} style={{ color: 'white' }}>
          <ToggleButton icon={<FaCog />}> </ToggleButton>
        </Button>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          disablePortal
        >
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              <MenuItem onClick={handleClose}>Change Character</MenuItem>
              <MenuItem onClick={handleClose}>Manage Guild</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Popover>
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div>
      {/* PC View */}

      <div className={styles.header}>
        <div className={styles.toggleMobile}>
          <ToggleButton icon={<FaBars />}> a</ToggleButton>
        </div>
        <div className={styles.togglePC}>
          <div className={styles.profile}>
            <div className={styles.flex}>
              <div className={styles.profileimage} />
              <div className={styles.profilenames}>
                <div className={styles.profilename}>Character Name</div>
                <div className={styles.profilesub}>Guild Name</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Notifications />
          <SettingsPopover />
        </div>
      </div>
    </div>
  )
}

export default Header
