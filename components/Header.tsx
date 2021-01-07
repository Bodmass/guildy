import { useState, useRef, useEffect, useMemo } from 'react'
import { FaBell, FaCog } from 'react-icons/fa'
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
    lineHeight: '1.5',
    letterSpacing: '1px',
    margin: '0, 6px',
    marginBottom: '6px',
    fontSize: '1rem',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.5)',
    whiteSpace: 'normal',
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

const ALL_NOTIFICATIONS = ['My', 'Name', 'Is', 'Aziz', 'Ben', 'is', 'cute']

function populateNotificiations() {
  // for now does nothing, however this should grab from a database.
}

function Notifications() {
  const [open, setOpen] = useState(false)
  const [test, setTest] = useState(-1)
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

  useMemo(() => {}, [test])

  return (
    <div>
      <div>
        <Button ref={anchorRef} onClick={handleToggle} style={{ color: 'white' }} draggable={false}>
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
              padding: '6px 6px',
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
              <div style={{ display: ALL_NOTIFICATIONS.length === 0 ? 'flex' : 'none' }}>No new notifications</div>
              <>
                {ALL_NOTIFICATIONS.map((name, index) => (
                  <>
                    <NotificationItem>
                      {name}
                      <Button
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          minWidth: 16,
                          width: 16,
                          height: 16,
                          fontWeight: 'bold',
                          border: '1px solid black',
                        }}
                        onClick={() => {
                          ALL_NOTIFICATIONS.splice(index, 1)
                          setTest(ALL_NOTIFICATIONS.length)
                        }}
                      >
                        X
                      </Button>
                    </NotificationItem>
                  </>
                ))}
              </>
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
              <div className={styles.toggleMobile}>
                <MenuItem>Character Name</MenuItem>
              </div>
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
  populateNotificiations()
  return (
    <div>
      {/* PC View */}

      <div className={styles.header}>
        <div className={styles.toggleMobile} />
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
