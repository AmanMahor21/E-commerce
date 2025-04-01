import { Button } from '../components/ui/button'
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Download, Upload } from "lucide-react";
import Image from "next/image";

// Placeholder Data
const orderData = {
  id: "ajdj1323r34e3e3nn4r3322",
  storeName: "Andhra Pickle Store",
  productName: "Chicken Pickle (250 g)",
  imageUrl: "/Frame 1000006486.svg",
  deliveryAddress: {
    name: "Jagadeesh Reddy",
    address: "mig-125 , near hostel, kphb colony, hyderabad, telengana, 500072",
    phone: "77804xxxx6",
  },
  timeline: [
    { status: "Order Confirmed", date: "10 Nov" },
    { status: "Shipped", date: "11 Nov" },
    { status: "Out for delivery", date: "13 Nov" },
    { status: "Delivered", date: "13 Nov" },
  ],
  rating: 4,
  invoice: [
    { label: "MRP total", value: "₹999" },
    { label: "Discount", value: "-₹333", highlight: true },
    { label: "Delivery Fee", value: "₹40" },
    { label: "Handling Fee", value: "₹9 Free", highlight: true },
    { label: "Coupon Discount", value: "-₹25", highlight: true },
    { label: "Grand Total", value: "₹696", total: true },
    { label: "Savings", value: "₹358", note: true },
  ],
};

export default function OrderDetails() {
  return (
    <div className="flex min-h-screen pt-[50px] mt-[96px]">
      <div className="flex-1 p-4 space-y-6">
        {/* Order Header */}
        <Card className="p-4 flex items-start justify-between border-blue-200 border-2">
          <div className="flex gap-4">
            <Image
              src={orderData.imageUrl}
              alt={orderData.productName}
              width={100}
              height={80}
              className="rounded-lg"
            />
            <div>
              <div className="text-sm text-gray-600">
                Order Id: <span className="text-blue-600">{orderData.id}</span>
              </div>
              <div className="text-gray-600">{orderData.storeName}</div>
              <div className="font-semibold">{orderData.productName}</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-orange-500 border-orange-500 hover:bg-orange-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download invoice
          </Button>
        </Card>

        {/* Delivery Address and Timeline */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="lg:w-1/2 space-y-2">
              <h2 className="font-semibold">Delivery Address</h2>
              <div className="space-y-1">
                <div>{orderData.deliveryAddress.name}</div>
                <div className="text-gray-600">
                  {orderData.deliveryAddress.address}
                </div>
                <div className="text-gray-600">
                  Phone number - {orderData.deliveryAddress.phone}
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="lg:w-full -translate-x-19 relative top-12">
              <div className="relative">
                <div className="absolute left-0 right-0 top-3 h-0.5 bg-orange-500 -translate-x-4"></div>
                <div className="relative flex justify-between">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                      <div className="mt-2 text-xs font-medium text-gray-500">
                        {step.status}
                      </div>
                      <div className="text-xs text-gray-400">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rating and Review */}
        <div className="grid md:grid-cols-2 gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="font-medium">Rate the item -</div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-3xl ${
                        star <= orderData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-4 flex items-center justify-center border-dashed cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400" />
                <div className="mt-1">Upload images</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="font-medium">Write Review</div>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Write your review here..."
                />
              </div>
            </Card>
          </div>

          {/* Bill Invoice */}
          <Card className="p-4">
            <div className="space-y-4">
              <h2 className="font-semibold">Bill Invoice</h2>
              <div className="space-y-2">
                {orderData.invoice.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between ${
                      item.total ? "bg-blue-50 p-2 font-medium" : ""
                    }`}
                  >
                    <span
                      className={item.highlight ? "text-blue-600" : ""}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`${
                        item.note
                          ? "text-blue-600 text-sm"
                          : item.total
                          ? "text-orange-500"
                          : ""
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
