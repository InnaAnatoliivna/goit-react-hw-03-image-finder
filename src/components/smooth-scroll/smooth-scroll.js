import { animateScroll as scroll } from 'react-scroll'

const smoothScroll = () => {
    scroll.scrollToTop({
        top: 0,
        duration: 500,
        smooth: 'easeInOutGuard'
    })
}

export default smoothScroll;