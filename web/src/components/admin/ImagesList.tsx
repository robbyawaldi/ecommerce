import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/ImagesList.module.css'

interface ImagesListProps {
    images: string[]
}

export const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
    const length = useMemo(() => images.length, [images])
    const divider = useMemo(() => length / 2, [])
    const [index, setIndex] = useState(1)
    const [tx, setTx] = useState(0)
    const [duration, setDuration] = useState(0.25)
    const [isfromPortal, setIsFromPortal] = useState(false)
    const [isDisabledButton, setIsDisabledButton] = useState(false)

    const cloneImages = useMemo(() => (
        length > 1
            ? length % 2 === 0
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
            : images
    ), [])

    useEffect(() => {
        const firstPosition = (Math.floor(divider) - (length % 2 === 0 ? 1 : 0)) * 150;

        if (length > 1) setTx(index > 0 ? firstPosition + 144 * index : firstPosition);
        else setTx(0)
    }, [index])

    useEffect(() => {
        if (isfromPortal) {
            setDuration(0)
            setIsFromPortal(false)
        }
    }, [isfromPortal])

    useEffect(() => {
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

    const transform = useMemo(() => `translate3d(-${tx}px, 0px, 0px)`, [tx]);
    const transition = useMemo(() => `all ${duration}s ease 0s`, [duration]);

    return (
        <div className="relative">
            <div className={`overflow-x-hidden w-full`}>
                <div
                    className={`w-full h-full flex`}
                    style={{
                        transform,
                        transition
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
            {
                length > 1 ? (
                    <button
                        className={`${styles.button} ${styles.prev}`}
                        onClick={handlePrev}
                        disabled={isDisabledButton}>
                        prev
                    </button>
                ) : null
            }
            {
                length > 1 ? (
                    <button
                        className={`${styles.button} ${styles.next}`}
                        onClick={handleNext}
                        disabled={isDisabledButton}>
                        next
                    </button>
                ) : null
            }

        </div>
    );
}