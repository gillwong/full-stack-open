import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <div className="m-1">
      <div style={hideWhenVisible}>
        <button
          className="m-1 px-3 py-1 rounded-md bg-sky-600 text-white"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button
          className="m-1 px-3 py-1 rounded-md bg-rose-600 text-white"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
