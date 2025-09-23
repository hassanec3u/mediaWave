package com.media.business.filestorage;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.User;
import com.media.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URI;
import java.util.UUID;

@Service
public class FileStorageService {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    private final S3Client s3Client;

    private final String bucketName;

    private final String endpoint;

    private final String publicDomain;

    public FileStorageService(
            @Value("${cloudflare.r2.access-key}") String accessKey,
            @Value("${cloudflare.r2.secret-key}") String secretKey,
            @Value("${cloudflare.r2.endpoint}") String endpoint,
            @Value("${cloudflare.r2.bucket}") String bucketName,
            @Value("${cloudflare.r2.public-domain}") String publicDomain) {

        this.endpoint = endpoint;
        this.bucketName = bucketName;
        this.publicDomain = publicDomain;

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);

        this.s3Client = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .endpointOverride(URI.create(endpoint))
                .region(Region.of("auto"))
                .build();
    }

    /**
     * Upload d’une image de profil
     */
    public String uploadProfilePicture(MultipartFile file) throws IOException {
        User currentUser = this.customUserDetailsService.getAuthenticatedUser();
        String userId = currentUser.getId();

        String key = "profiles/" + userId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        this.s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(this.bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );

        String imageUrl = this.publicDomain + "/" + key;
        currentUser.setProfilePicture(imageUrl);
        this.userRepository.save(currentUser);

        return imageUrl;
    }

    /**
     * Upload d’une image pour un post
     */
    public String uploadPostImage(String publisherId, MultipartFile file) throws IOException {


        String key = "posts/" + publisherId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        this.s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(this.bucketName)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );

        String imageUrl = this.publicDomain + "/" + key;
        return imageUrl;
    }

}
