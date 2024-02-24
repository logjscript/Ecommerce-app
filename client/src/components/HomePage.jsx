import ImageScroller from './ImageScroller';

export default function HomePage() {  
    return (
        <div 
            data-testid='homepage'
            className='flex-1 flex flex-col justify-center items-center pt-20'
        >
            <ImageScroller />
        </div>
    )
}