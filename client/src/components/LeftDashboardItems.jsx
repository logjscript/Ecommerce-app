
const LeftDashboardItems = ({ classes, handleItemTypeClick, testIdNumber }) => {
  return (
    <ul className={classes}>
        <li><button data-testid={`itemTypeButton${testIdNumber}`} onClick={(e) => handleItemTypeClick(e)} value='hats'className='text-left md:text-center'>Hats</button></li>
        <li><button onClick={(e) => handleItemTypeClick(e)} value='sweatshirts' className='text-left md:text-center'>Sweatshirts</button></li>
        <li><button onClick={(e) => handleItemTypeClick(e)} value='shirts' className='text-left md:text-center'>Shirts</button></li>
        <li><button onClick={(e) => handleItemTypeClick(e)} value='pants' className='text-left md:text-center'>Pants</button></li>
        <li><button onClick={(e) => handleItemTypeClick(e)} value='shoes' className='text-left md:text-center'>Shoes</button></li>
    </ul>
  )
}

export default LeftDashboardItems;