// /app/profile/wishlist/page.tsx
import { Metadata } from "next";
import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import { Wishlist } from "@/models/Wishlist";
import ProductCard from "@/components/users-products/ProductCard"; 
import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Your Saved Wishlist | Orbit",
  description: "Review and manage your curated collection of premium accessories and minimalist hardware assets.",
};

export default async function WishlistPage() {
  const session = await auth();
  
  // Security Gate: Redirect or block if user is sessionless
  if (!session || !session.user?.email) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">Please log in to view your saved items registry.</p>
      </div>
    );
  }

  await connectDb();

  //  Populate the referenced product document fields entirely to feed the card props structure
  const savedItems = await Wishlist.find({ userId: session.user.email })
    .populate("productId")
    .lean();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Your Saved Wishlist
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Review and access your personal curation of luxury architectural engineering items.
        </p>
      </div>

      <hr className="border-border/60" />

      {savedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-xl bg-card/40">
          <h3 className="text-sm font-medium text-foreground mb-1">Your wishlist is empty</h3>
          <p className="text-xs text-muted-foreground mb-4">Explore the marketplace to bookmark elite hardware configurations.</p>
          <Link href="/users/products" className="text-xs font-semibold text-primary hover:underline">
            Go to Catalog →
          </Link>
        </div>
      ) : (
        // 🚀 Premium Layout Grid Array Map Rendering
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedItems.map((item: any) => {
            const product = item.productId;

            // Handle edge case if a product was deleted from DB but remains in user's wishlist document
            if (!product) return null;

            return (
              <ProductCard
                key={product._id.toString()}
                _id={product._id.toString()}
                name={product.name}
                category={product.category}
                price={product.price}
                imageUrl={product.imageUrl}
                variants={JSON.parse(JSON.stringify(product.variants || []))}
                isInitiallyWishlisted={true} // 👈 Since it is loaded from the wishlist db, it is inherently TRUE
                isWishlistPage={true} // 👈 Custom flag to protect out-of-stock visibility mechanics
              />
            );
          })}
        </div>
      )}
    </div>
  );
}