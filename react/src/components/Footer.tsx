import React from 'react'

function Footer() {
  return (
    <div className='footer-middle bg-dark'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-md-12 col-sm-8 lala'>
            <ul className='list-unstyled'>
              <li>
                <a href='https://Google.com/'>Google</a>
              </li>
              <li>
                <a href='https://www.itech-bs14.de/startseite'>ITECH BS14</a>
              </li>
              <li>
                <a href='https://Github.com'>Github</a>
                <div className='Links-oben'>
                  &copy;{new Date().getFullYear()}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
