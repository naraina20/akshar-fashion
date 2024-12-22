const ProductLoader = () => {
  return (
    <div className="container py-4">
      <div className="row g-4">
        {Array(8) // Adjust the number of skeleton cards
          .fill(0)
          .map((_, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card p-3">
                <div className="placeholder-glow">
                  {/* Skeleton Image */}
                  <div
                    className="placeholder w-100 rounded"
                    style={{ height: "150px" }}
                  ></div>
                  {/* Skeleton Text */}
                  <div className="mt-3">
                    <span className="placeholder col-6"></span>
                  </div>
                  <div className="mt-2">
                    <span className="placeholder col-4"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductLoader;
