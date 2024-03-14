import ImageScroller from './ImageScroller';

export default function HomePage() {  
    return (
        <div 
            data-testid='homepage'
            className='pt-20 flex-1 flex flex-col justify-center items-center m-[10%] md:m-0'
        >
            <ImageScroller />
        </div>
    )
}