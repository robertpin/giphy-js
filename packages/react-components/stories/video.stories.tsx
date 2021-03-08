import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import React, { useEffect, useState } from 'react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Video as VideoComponent } from '../src'

const gf = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

const eventAction = (event: string) => (gif: IGif) => {
    action(`Gif ${event} for ${gif.id}`)()
}

type Props = { id: string; width: number; height?: number; muted: boolean }
const VideoDemo = ({ id, width, height, muted }: Props) => {
    const [gif, setGif] = useState<IGif>()

    const fetch = async () => {
        const { data: gif } = await gf.gif(id)
        setGif(gif)
    }

    useEffect(() => {
        fetch()
    }, [id])

    return gif ? (
        <VideoComponent
            key={`gif-${id}`}
            gif={gif}
            width={width}
            height={height}
            muted={muted}
            onCanPlay={() => eventAction('can play')}
            onStateChange={(state) => eventAction(`state: ${state}`)}
            onEnded={() => eventAction('on ended')}
            onLoop={() => eventAction('on loop')}
            // onTimeUpdate={(t) => console.log(t)}
        />
    ) : null
}

export default {
    title: 'React Components/Video',
    decorators: [withKnobs, jsxDecorator],
}

export const Video = () => (
    <VideoDemo
        id={text('id', 'zavzFXHmdM44TXrW4B')}
        width={number('width', 300)}
        height={number('height', 0)}
        muted={boolean('muted', true)}
    />
)