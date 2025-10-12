import com.azka.adminportal.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository repo;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProduct(
            @RequestParam String name,
            @RequestParam double rating,
            @RequestParam int ratingCount,
            @RequestParam double price,
            @RequestParam double originalPrice,
            @RequestParam MultipartFile image
    ) throws IOException {
        // Validate the image file
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body("No image file provided.");
        }

        // Save image to static folder
        String uploadDir = "uploads/";
        String fileName = UUID.randomUUID() + "-" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        // Create directories if they don't exist
        Files.createDirectories(filePath.getParent());

        // Save the image to the file system
        try {
            Files.write(filePath, image.getBytes());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to save image: " + e.getMessage());
        }

        // Save product details in the database
        Product p = new Product();
        p.setName(name);
        p.setRating(rating);
        p.setRatingCount(ratingCount);
        p.setPrice(price);
        p.setOriginalPrice(originalPrice);
        p.setImagePath(filePath.toString());

        try {
            repo.save(p);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save product: " + e.getMessage());
        }

        return ResponseEntity.ok("Product uploaded successfully");
    }
}
