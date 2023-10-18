// import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

type Props = {
  children: React.ReactNode
}

const CarouselCustom = ({ children }: Props) => (
  <Carousel
    responsive={responsive}
    autoPlay={true}
    autoPlaySpeed={3000}
    infinite={true}
    // showDots={true}
    // customRightArrow={<CustomRightArrow />}
  >
    {children}
  </Carousel>
)

export default CarouselCustom
