import Markdown from "marked-react";


export default function Article () {
    const text = '# Marked in Node.js\n\nRendered by **marked**.';

    return (
        <Markdown>{text}</Markdown>
    )
}