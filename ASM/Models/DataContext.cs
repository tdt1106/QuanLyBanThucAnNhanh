using Microsoft.EntityFrameworkCore;

namespace ASM.Models
{
    public class DataContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-FRE8L7F;Initial Catalog=QuanLyBanThucAnNhanh;Integrated Security=True;Encrypt=True;Trust Server Certificate=True");
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().ToTable(nameof(Product));

            modelBuilder.Entity<Category>().ToTable(nameof(Category))
                .HasMany(e => e.Products)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .HasPrincipalKey(e => e.Id);

            modelBuilder.Entity<Order>(entity => {
                entity.Property(o => o.ShipName).IsRequired();
                entity.Property(o => o.ShipPhoneNumber).IsRequired();
                entity.Property(o => o.ShipAddress).IsRequired();
            });

            modelBuilder.Entity<OrderProduct>(entity => {
                entity.Property(e => e.ProductId).IsRequired();
                entity.Property(e => e.OrderId).IsRequired();
                entity.Property(e => e.Quantity).IsRequired();
                entity.HasOne(od => od.Product)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(od => od.ProductId);
                entity.HasOne(od => od.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(od => od.OrderId);
                entity.Property(e => e.Price).IsRequired()
        .HasColumnType("decimal(18,2)");
            });

            modelBuilder.Entity<User>().ToTable(nameof(User));



        }

    }
}
