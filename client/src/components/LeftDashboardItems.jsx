
const LeftDashboardItems = ({ classes, handleTypeClick, testIdNumber }) => {
  return (
    <ul className={classes}>
        <li><button data-testid={`itemTypeButton${testIdNumber}`} onClick={(e) => handleTypeClick(e)} value='hats'className='text-left md:text-center'>Hats</button></li>
        <li><button onClick={(e) => handleTypeClick(e)} value='sweatshirts' className='text-left md:text-center'>Sweatshirts</button></li>
        <li><button onClick={(e) => handleTypeClick(e)} value='shirts' className='text-left md:text-center'>Shirts</button></li>
        <li><button onClick={(e) => handleTypeClick(e)} value='pants' className='text-left md:text-center'>Pants</button></li>
        <li><button onClick={(e) => handleTypeClick(e)} value='shoes' className='text-left md:text-center'>Shoes</button></li>
    </ul>
  )
}

export default LeftDashboardItems;