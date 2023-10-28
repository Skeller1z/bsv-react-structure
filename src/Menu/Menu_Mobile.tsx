import React from 'react'


const Menu_Mobile = ({pageshow}) => {
  return (
    <>
    <div id="content" className="dx-theme-background-color">
        <div className="grid grid-cols-12 bg-[#F6F9FF] mb-16 mt-[60px]">
          <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white">
            {pageshow}
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu_Mobile