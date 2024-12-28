import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Assuming you're using Redux for cart state management
import { fetchCartItems } from "@/store/shop/cart-slice";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth);
const userId = user?.id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)); // Dispatch action to fetch cart items
    }
  }, [userId, dispatch]);


  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successful!</CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
