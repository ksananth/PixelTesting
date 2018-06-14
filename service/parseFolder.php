<?php


$fintro = parseBrandFolders(getFolderPath('fintro'));
$helloBank = parseBrandFolders(getFolderPath('hellobank'));
$fortis = parseBrandFolders(getFolderPath('fortis'));

    $final = new stdClass();
    if(isset($fortis)){
        $final->fortis = $fortis;
    }
    if(isset($fintro)){
        $final->fintro = $fintro;
    }
    if(isset($helloBank)){
        $final->hellobank = $helloBank;
    }

    print_r(json_encode($final));


function getFolderPath($brand) {
	$path ="";
	if($brand == 'fintro'){
        $path="../screenshots/fintro/";
    }
    else if($brand == 'hellobank'){
        $path="../screenshots/hello/";
    }else{
        $path="../screenshots/fortis/";
    }
    return $path;
}


function parseBrandFolders($path) {

if (file_exists($path)) {
      	$dir = new DirectoryIterator($path);
      	$folderArray = array();
        $screenArray = array();
        $count = 0;

        

        //Looping Main Folder (Screens)
      	foreach ($dir as $fileinfo) {
            if ($fileinfo->isDir() && !$fileinfo->isDot()) {
              
              array_push($folderArray,$fileinfo->getFilename());

              $screenArray[$count] = array();
              $screenArray[$count]['screenName'] = $fileinfo->getFilename();
              $screenArray[$count]['languages'] = array();
              $screenArray[$count]['imagesURL'] = array();


              //Looping Sub Folder (Languages)
              $subFolderpath=$path.$fileinfo->getFilename();
              $subFolderdir = new DirectoryIterator($subFolderpath);
              foreach ($subFolderdir as $subFolderInfo) {
                if ($subFolderInfo->isDir() && !$subFolderInfo->isDot()) {

                  array_push($screenArray[$count]['languages'],$subFolderInfo->getFilename());
                  $screenArray[$count]['imagesURL'][$subFolderInfo->getFilename()] = array();
                  

                      $folder_path =  $path.$fileinfo->getFilename()."/".$subFolderInfo->getFilename()."/*.*";
                      $files = glob( $folder_path);
         
                       //Loop all images in folder
                        for ($i=0; $i<count($files); $i++)
                        {
                          $image = $files[$i];
                          $supported_file = array(
                             'gif',
                             'jpg',
                             'jpeg',
                             'png'
                          );
               
                          $ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
                          if (in_array($ext, $supported_file)) {
                            $object = new stdClass();
                            $object->imgUrl = $image;
                            $object->deviceName = preg_replace('/\\.[^.\\s]{3,4}$/', '',basename($image));
                            array_push($screenArray[$count]['imagesURL'][$subFolderInfo->getFilename()],$object);
                              //echo basename($image)."<br />"; // show only image name if you want to show full path then use this code // echo $image."<br />";
                              //echo '<img src="'.$image .'" alt="Random image" />'."<br /><br />";
                            } else {
                                continue;
                            }
                          }
                          // inner loop

                }
              }
              $count++;
            }

          }
          sort($screenArray);
        return $screenArray;
        }
}
?>