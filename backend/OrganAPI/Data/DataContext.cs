using Microsoft.EntityFrameworkCore;
using OrganAPI.Models;

namespace OrganAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Notes> Notes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Boards> Boards { get; set; }
        public DbSet<Jobs> Jobs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Notes>().HasOne<User>().WithMany(x => x.Notes).HasForeignKey("FK_User_ID");
            modelBuilder.Entity<Task>().HasOne<User>().WithMany(x => x.Tasks).HasForeignKey("FK_User_ID");
            modelBuilder.Entity<Boards>().HasOne<User>().WithMany(x => x.Boards).HasForeignKey("FK_User_ID");

            modelBuilder.Entity<Jobs>().Property(y => y.Status).HasConversion<string>();
            modelBuilder.Entity<Jobs>().HasOne<Boards>().WithMany(x => x.Jobs).HasForeignKey("FK_Board_ID");
        }
    }
}
