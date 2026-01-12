import getClassWithTeacherById from "@/app/actions/getClassWithTeacherById";
import createCheckoutSession from "@/app/actions/createCheckoutSession";

export default async function CheckoutPage({ params }) {
  const yogaClass = await getClassWithTeacherById(params.classId);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 pt-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">

            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Confirm Your Booking
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    Review your class details before proceeding to payment
                </p>
            </div>

            {/* Class Summary */}
            <div className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Yoga Class
                    </h2>
                    <p className="text-gray-700 mt-1"><em>{yogaClass.title}</em></p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Instructor
                    </h2>
                    <p className="text-gray-700 mt-1"><em>{yogaClass.teacher.name}</em></p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Date & Time
                    </h2>
                    <p className="text-sm text-gray-600">
                        <em>
                            {new Date(yogaClass.start_at).toLocaleString([], {
                                weekday: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </em>
                    </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t mt-3">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                    £{yogaClass.price}
                    </span>
                </div>
            </div>

            {/* Payment Form */}
            <form action={createCheckoutSession} className="space-y-4">

                <input type="hidden" name="classId" value={yogaClass.$id} />
                <input type="hidden" name="price" value={yogaClass.price} />

                {/* NEW: User name input */}
                <div>
                    <label htmlFor="students_name" className="block text-gray-700 font-medium mb-1">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="students_name"
                        name="students_name"
                        required
                        placeholder="Enter your full name"
                        className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* NEW: User email input */}
                <div>
                    <label htmlFor="students_name" className="block text-gray-700 font-medium mb-1">
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="students_email"
                        name="students_email"
                        required
                        placeholder="Enter your email address"
                        className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700
                            text-white font-medium py-3 rounded-lg
                            transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Pay now
                </button>

                <p className="text-xs text-gray-500 text-center">
                    Secure payment powered by Stripe
                </p>
            </form>
        </div>
    </div>
  );
}
