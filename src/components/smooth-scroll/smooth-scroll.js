import { animateScroll as scroll } from 'react-scroll'

const SmoothScroll = () => {
    scroll.scrollToTop({
        top: 0,
        duration: 500,
        smooth: 'easeInOutGuard'
    })

    return (
        <div className='scroll-wrapp'>
            <button className='scroll-up' type='button'>TO TOP</button>
        </div>
    )
}

export default SmoothScroll;