
class Globals
{
    static Instance = new Globals();
     
    initialize()
    {
        this.soundRecorder = new SoundRecorder();         
        this.soundRecorder.initialize();
    }
}
