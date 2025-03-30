
type Props = {
    inputValue: string;
}

export default function SearchNoResult({inputValue} : Props ) {
    return (
        <div className="p-4 text-center">
            <p className="truncate">No result found for: {inputValue}</p>
        </div>
    )
}
