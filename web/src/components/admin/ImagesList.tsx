import React from 'react'
import styles from '../../styles/ImagesList.module.css'

interface ImagesListProps {
    images: string[]
}

export const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
    const length = React.useMemo(() => images.length, [])
    const divider = React.useMemo(() => length / 2, [])
    const [index, setIndex] = React.useState(1)
    const [tx, setTx] = React.useState(0)
    const [duration, setDuration] = React.useState(0.25)
    const [isfromPortal, setIsFromPortal] = React.useState(false)
    const [isDisabledButton, setIsDisabledButton] = React.useState(false)

    const cloneImages = React.useMemo(() => (
        length % 2 === 0
            ? [
                ...images.slice(divider, length),
                ...images,
                ...images.slice(0, divider),
            ]
            : [
                ...images.slice(Math.floor(divider), length),
                ...images,
                ...images.slice(0, Math.ceil(divider)),
            ]
    ), [])

    React.useEffect(() => {
        const firstPosition = Math.floor(divider) * 150;

        setTx(index > 0 ? firstPosition + 144 * index : firstPosition);
    }, [index])

    React.useEffect(() => {
        if (isfromPortal) {
            setDuration(0)
            setIsFromPortal(false)
        }
    }, [isfromPortal])

    React.useEffect(() => {
        if (duration == 0) setDuration(0.25)
    }, [index])

    const handleNext = () => {
        setIndex((i) => i + 1);
        setIsDisabledButton(true)
    };

    const handlePrev = () => {
        setIndex((i) => i - 1)
        setIsDisabledButton(true)
    }

    const handleTransitionEnd = () => {
        if (index == length + 1) {
            setIndex(1);
            setIsFromPortal(true)
        } else if (index == 0) {
            setIndex(length)
            setIsFromPortal(true)
        }
        setIsDisabledButton(false)
    };

    return (
        <div className="relative">
            <button
                className={`${styles.button} ${styles.prev} focus:outline-none`}
                onClick={handlePrev}
                disabled={isDisabledButton}>
                prev
            </button>
            <div className={`overflow-x-hidden w-full`}>
                <div
                    className={`w-full h-full flex`}
                    style={{
                        transform: `translate3d(-${tx}px, 0px, 0px)`,
                        transition: `all ${duration}s ease 0s`
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {
                        cloneImages.map((image: string, index) => (
                            <img key={index} className="rounded-md mx-2 w-32" src={image} />
                        ))
                    }
                </div>
            </div>
            <button
                className={`${styles.button} ${styles.next} focus:outline-none`}
                onClick={handleNext}
                disabled={isDisabledButton}>
                next
            </button>
        </div>
    );
}