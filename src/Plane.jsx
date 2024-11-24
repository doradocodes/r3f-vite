export default function Plane(props) {
    return (
        <mesh
            {...props}
        >
            <planeGeometry args={[1000, 1000]}/>
            <meshStandardMaterial
                color="lightgray"
                opacity={0.1} // Adjust transparency level
                transparent={true} // Enable transparency
            />
        </mesh>
    )
}
