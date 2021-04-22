import { useState, useRef, useEffect } from 'react'
import { FaCog } from 'react-icons/fa'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { destroyCookie } from 'nookies'
import styles from '../header.module.css'

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

const SettingsPopover = ({ setSettings, characterData }: { setSettings: Function; characterData: Object }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
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

  if (characterData === undefined) {
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
                <MenuItem
                  onClick={() => {
                    setSettings(true)
                    handleClose()
                  }}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  component="a"
                  href="/"
                  onClick={() => {
                    destroyCookie(null, 'id')
                    destroyCookie(null, 'character')
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Popover>
        </div>
      </div>
    )
  }

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
              <MenuItem
                component="a"
                href="/"
                onClick={() => {
                  destroyCookie(null, 'character')
                }}
              >
                Change Character
              </MenuItem>
              <MenuItem onClick={handleClose}>Manage Guild</MenuItem>
              <MenuItem
                onClick={() => {
                  setSettings(true)
                  handleClose()
                }}
              >
                Settings
              </MenuItem>
              <MenuItem
                component="a"
                href="/"
                onClick={() => {
                  destroyCookie(null, 'id')
                  destroyCookie(null, 'character')
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Popover>
      </div>
    </div>
  )
}

export default SettingsPopover
