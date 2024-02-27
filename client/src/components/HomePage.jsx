import ImageScroller from './ImageScroller';

export default function HomePage() {  
    return (
        <div 
            data-testid='homepage'
            className='flex-1 flex flex-col justify-center items-center md:pt-20'
        >
            <h1 className='md:hidden m-8 font-pacifico text-5xl'>Brand</h1>

            <ImageScroller />
        </div>
    )
}