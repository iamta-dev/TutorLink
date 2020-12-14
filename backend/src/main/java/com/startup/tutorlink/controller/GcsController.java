package com.startup.tutorlink.controller;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.BlobInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.storage.Storage;

import javax.servlet.ServletException;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

@RestController
@RequestMapping("/api/gcs")
public class GcsController {

    @Autowired
    Storage storage;

    @RequestMapping(method = RequestMethod.POST, value = "")
    public String uploadFile(@RequestParam("image") MultipartFile fileStream)
            throws IOException, ServletException {

        String bucketName = "tutorlink-bucket-user";
        String fileExtension = checkFileExtension(fileStream.getOriginalFilename());
        String pattern = "-YYYY-MM-dd-HHmmssSSS";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        //File file = convertMultiPartToFile( fileStream );

        BlobInfo blobInfo =
                storage.create(
                        BlobInfo
                                .newBuilder(bucketName, date + fileExtension)
                                .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                                .build(),
                        fileStream.getBytes()
                );
        System.out.println(blobInfo.getMediaLink());
        return blobInfo.getMediaLink();
    }

    private File convertMultiPartToFile(MultipartFile file ) throws IOException
    {
        File convFile = new File( file.getOriginalFilename() );
        // This will write file to root project
//        FileOutputStream fos = new FileOutputStream( convFile );
//        fos.write( file.getBytes() );
//        fos.close();
        return convFile;
    }

    private String checkFileExtension(String fileName) throws ServletException {
        if (fileName != null && !fileName.isEmpty() && fileName.contains(".")) {
            String[] allowedExt = {".jpg", ".jpeg", ".png"};
            for (String ext : allowedExt) {
                if (fileName.endsWith(ext)) {
                    return ".jpg";
                }
            }
            throw new ServletException("file must be an image");
        }
        throw new ServletException("file must be valid");
    }
}
