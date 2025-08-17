import { useRouter } from 'next/router';

const ModelDetail = () => {
  const router = useRouter();
  const { modelId } = router.query;
  return (
    <div>ModelDetail {modelId}</div>
  )
}

export default ModelDetail