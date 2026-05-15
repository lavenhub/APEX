import asyncio
from backend.scanner import scan_vehicle_image

async def test():
    # create a dummy image
    from PIL import Image
    import io
    img = Image.new('RGB', (100, 100), color = 'red')
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    res = await scan_vehicle_image(buf.getvalue())
    print("RESULT:", res)

if __name__ == "__main__":
    asyncio.run(test())
