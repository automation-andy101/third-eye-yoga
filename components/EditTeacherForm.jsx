import getTeacherById from "@/app/actions/getTeacherById";
import editTeacher from "/app/actions/editTeacher";

const EditTeacherForm = async ({ teacher }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${teacher.image_id}/view?project=${projectId}`;
    const imageSrc = previewImage ? previewImage : teacher.image_id ? imageUrl : "/images/no-image.jpg";
    
    const [state, formAction] = useFormState(editTeacher, {});
    const router = useRouter();

    useEffect(() => {
        if (state?.error) toast.error(state.error);

        if (state?.success) {
            toast.success("Room updated successfully!");
            router.push("/rooms/my");
        }
    }, [state, router]);
        
    return (
        <div>EditTeacherForm</div>
    )
}

export default EditTeacherForm